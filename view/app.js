import { html } from "../libs/lit-html.js"
import { State } from "../model/store.js"

/**
 * @param {State} state
 * @returns {any}
 * 
 */
export const app = (state) => {

    const { tasks } = state
    const tasksAsArray = Object.values(tasks)

    return html` 
    <div>
        <sl-dialog open label="New Task">
            <form>
                <td-spacing bottom="xl">
                <td-spacing bottom="s">    
                <sl-input filled name="title" label="Title" 
                required></sl-input>
                </td-spacing> 

                <td-spacing bottom="s">
                <sl-input filled name="due" label="Due Date" 
                required></sl-input> 
                </td-spacing>

                <td-spacing bottom="s">
                <sl-input filled name="urgency" label="Urgency" 
                required></sl-input>
                </td-spacing> 

                </td-spacing>

                <div slot="footer">
                    <sl-button>Cancel</sl-button>
                    <sl-button variant="primary">Save</sl-button>
                </div>
            </form>
            </sl-dialog>

        <header>
            <h1>Todo App</h1>

            <sl-button variant="primary">Add Task</sl-button>    
         </header>

         <main>
         <h2>Tasks (${tasksAsArray.length || 0})</h2>
            <ul></ul>
        </main>
    </div>
    `
}