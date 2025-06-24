import { createSlice } from "@reduxjs/toolkit";
import Blog from "../../data/Blog";

const initialState = {
    Blog: Blog
};

const BlogSlice = createSlice({
    name: "Blog",
    initialState,
    reducers: {}
});

export default BlogSlice.reducer;
