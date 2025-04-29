import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "admin_slice",
    initialState: {
        dir_glow: false,
        is_streaming: false,
        traing_command_prompt: [],
        training_percentage: 0,
        selected_modal_image: {},
        create_image_modal: {
            modal_type: 'Update model',
            endpoint: "/upload_image"
        },
    },
    reducers: {
        get_dir(state, action) {
            const { type, data } = action.payload;

            switch (type) {
                case "request":
                    state.dir_glow = true
                    state.dir_data = {}
                    state.create_image_modal = { modal_type: 'Update model', endpoint: "/upload_image" }
                    break;

                case "response":
                    state.dir_glow = false
                    state.dir_data = data
                    state.is_under_tarining = !!data?.filter(item => item.status === "training")?.length;
                    break;

                case "failure":
                    state.dir_glow = false
                    break;

                default:
                    break;
            }
        },

        update_create_image_modal(state, action) {
            Object.entries(action.payload).forEach(([key, value]) => {
                switch (key) {
                    case "folder_name": {
                        if (state.create_image_modal.modal_type !== "Create new model") {
                            const class_folders =
                                state.dir_data?.find(item => item.name === value)
                                    ?.children?.find(child => child.name === "train")
                                    ?.children?.filter(folder => folder.type === "folder")
                                    ?.map(folder => folder.name) || [];

                            state.create_image_modal.class_names = class_folders;
                            state.create_image_modal.no_of_classes = class_folders?.length || 0;
                        }

                        state.create_image_modal.folder_name = value;
                        break;
                    }

                    case "modal_type":
                        state.create_image_modal.modal_type = value;
                        state.create_image_modal.endpoint = value === "Create new model" ? "/create_class" : "/upload_image";
                        state.create_image_modal.folder_name = "";
                        state.create_image_modal.class_names = [];
                        state.create_image_modal.no_of_classes = 0;
                        break;

                    case "add_new_class": {
                        const newClass = state.create_image_modal.new_class_name?.trim();
                        if (newClass) {
                            const class_names_array = state.create_image_modal.class_names || []
                            if (!class_names_array.includes(newClass)) {
                                class_names_array.push(newClass);
                            }

                            state.create_image_modal.class_names = class_names_array
                            state.create_image_modal.no_of_classes = class_names_array?.length || 0;
                        }
                        state.create_image_modal.new_class_name = "";
                        break;
                    }

                    default:
                        state.create_image_modal[key] = value;
                        break;
                }
            });
        },
        create_update_modal(state, action) {
            const { type, data } = action.payload;

            switch (type) {
                case "request":
                    state.create_update_modal_spinner = true
                    break;

                case "response":
                    state.create_update_modal_spinner = false
                    state.create_image_modal = { modal_type: 'Update model', endpoint: "/upload_image" }
                    break;

                case "failure":
                    state.create_update_modal_spinner = false
                    break;

                default:
                    break;
            }
        },
        update_selected_modal_image(state, action) {
            state.selected_modal_image = action.payload
        },

        deletion_data(state, action) {
            state.deletion_data = action.payload
            state.selected_modal_image = {}
        },
        delete_modal(state, action) {
            const { type, data } = action.payload;

            switch (type) {
                case "request":
                    state.delete_modal_spinner = true
                    break;

                case "response":
                    if (data?.from === "image_deletion") {
                        let remaining_images = state.selected_modal_image?.data?.filter(item => item.path !== data?.path);
                        state.selected_modal_image = {
                            ...state.selected_modal_image,
                            data: remaining_images
                        }
                    }

                    if (data?.from === "image_folder_deletion") {
                        let remaining_folders = removeFolderByPath(state.dir_data, data?.path);
                        state.dir_data = remaining_folders
                    }

                    if (data?.from === "folder_deletion") {
                        let remaining_folders = state.dir_data?.filter(item => item.path !== data?.path);
                        state.dir_data = remaining_folders
                    }

                    state.delete_modal_spinner = false
                    break;

                case "failure":
                    state.delete_modal_spinner = false
                    break;

                default:
                    break;
            }
        },

        train_modal_path(state, action) {
            state.train_path = action.payload
            state.train_model_spinner = false
        },
        train_modal(state, action) {
            const { type, data } = action.payload;

            switch (type) {
                case "request":
                    state.traing_command_prompt = []
                    state.training_percentage = 0
                    state.train_model_spinner = true
                    break;

                case "response":
                    state.train_model_spinner = false
                    state.traing_command_prompt = [data]
                    state.is_streaming = true

                    let update_dir = state.dir_data?.map(item =>
                        item.name === state.train_path ? { ...item, status: "training" } : item
                    )
                    state.dir_data = update_dir
                    break;

                case "failure":
                    state.train_model_spinner = false
                    break;

                default:
                    break;
            }
        },
        train_model_progress(state, action) {
            const { type, data } = action.payload;

            switch (type) {
                case "request":
                    if (data?.show === "training_status") {
                        state.train_path = data?.path
                        state.traing_command_prompt = []
                        state.training_percentage = 0
                        state.is_streaming = true
                    }
                    if (data?.show !== "training_status") state.traing_command_prompt = [...state.traing_command_prompt, data]
                    break;

                case "response":
                    state.traing_command_prompt = [...state.traing_command_prompt, data]
                    state.is_streaming = true
                    if (data?.epoch) state.training_percentage = data?.epoch;
                    if (data?.epoch === 100) {
                        let update_dir = state.dir_data?.map(item =>
                            item.name === state.train_path ? { ...item, status: "trained" } : item
                        )

                        state.dir_data = update_dir
                        state.is_streaming = false
                    }
                    break;

                case "failure":
                    state.is_streaming = false

                default:
                    break;
            }
        }
    }
})

const { actions, reducer } = adminSlice;

function removeFolderByPath(nodes, pathToRemove) {
    if (!nodes) return [];

    return nodes
        .filter(node => node.path !== pathToRemove)
        .map(node => ({
            ...node,
            children: removeFolderByPath(node.children, pathToRemove)
        }));
}

export const {
    get_dir, train_modal, update_create_image_modal,
    create_update_modal, train_modal_path, delete_modal,
    update_selected_modal_image, train_model_progress,
    deletion_data

} = actions;

export default reducer;