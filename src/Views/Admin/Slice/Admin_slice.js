import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "admin_slice",
    initialState: {
        dir_glow: false,
        create_image_modal: {
            modal_type: 'Update modal',
            endpoint: "/upload_image"
        }
    },
    reducers: {
        get_dir(state, action) {
            const { type, data } = action.payload;

            switch (type) {
                case "request":
                    state.dir_glow = true
                    state.dir_data = {}
                    state.create_image_modal = { modal_type: 'Update modal', endpoint: "/upload_image" }
                    break;

                case "response":
                    state.dir_glow = false
                    state.dir_data = data
                    break;

                case "failure":
                    state.dir_glow = false
                    break;

                default:
                    break;
            }
        },
        train_modal(state, action) {
            const { type, data } = action.payload;
            const is_under_tarining = state.train_path?.filter((item) => item !== data) || [];

            switch (type) {
                case "request":
                    if (state.train_path) state.train_path = [...state.train_path, data];
                    else state.train_path = [data];
                    break;

                case "response":
                    const update_train_details = state.dir_data?.map(item => item.name === data ? { ...item, status: 'y' } : item)
                    state.dir_data = update_train_details
                    state.train_path = is_under_tarining;
                    break;

                case "failure":
                    state.train_path = is_under_tarining;
                    break;

                default:
                    break;
            }
        },
        update_create_image_modal(state, action) {
            Object.entries(action.payload).forEach(([key, value]) => {
                switch (key) {
                    case "folder_name": {
                        const class_folders =
                            state.dir_data?.find(item => item.name === value)
                                ?.children?.find(child => child.name === "train")
                                ?.children?.filter(folder => folder.type === "folder")
                                ?.map(folder => folder.name) || [];

                        state.create_image_modal.class_names = class_folders;
                        state.create_image_modal.no_of_classes = class_folders?.length || 0;
                        state.create_image_modal.folder_name = value;
                        break;
                    }

                    case "modal_type":
                        state.create_image_modal.modal_type = value;
                        state.create_image_modal.endpoint = value === "Create new modal" ? "/create_class" : "/upload_image";
                        state.create_image_modal.folder_name = "";
                        state.create_image_modal.class_names = [];
                        break;

                    case "add_new_class": {
                        const newClass = state.create_image_modal.new_class_name?.trim();
                        if (newClass) {
                            state.create_image_modal.class_names = state.create_image_modal.class_names || [];
                            if (!state.create_image_modal.class_names.includes(newClass)) {
                                state.create_image_modal.class_names.push(newClass);
                            }
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
                    state.create_image_modal = { modal_type: 'Update modal', endpoint: "/upload_image" }
                    break;

                case "failure":
                    state.create_update_modal_spinner = false
                    break;

                default:
                    break;
            }
        }
    }
})

const { actions, reducer } = adminSlice;

export const {
    get_dir, train_modal, update_create_image_modal,
    create_update_modal

} = actions;

export default reducer;