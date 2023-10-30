import './components/td-spacing.js'

import { addTask } from "./model/actions.js";
import { dispatch, subscribe, getState } from "./model/store.js";

import { render } from "./libs/lit-html.js";
import { app } from "./view/app.js";





const html = document.querySelector("[data-app]")
const initialRender = app(getState());
render(initialRender, html);

subscribe((_, next) => {
const newRender = app(next)
render(newRender, html);
})

document.body.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!(event.target instanceof HTMLFormElement)) {
        throw new Error("Form required");
    }
    const data = new FormData(event.target);
    const { title } = Object.fromEntries(data)

    dispatch(addTask({ title: title.toString() }))
    event.target.reset()

    console.log(title);
});
