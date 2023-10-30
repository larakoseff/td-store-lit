import { LitElement, html, css } from '../libs/lit-html.js'
import { Task } from '../model/store.js';

/**
 * @type {Array<Task>}
 */
const TESTING = [
    {
        id: "9fc5a3c9-86dd-40ce-a72f-c255d5ad5d8b",
        title: 'Wash the dog',
        urgency: 'high',
        due: null,
        completed: false,
        created: new Date(),
    },
    {
        id: "c4bd4c43-b76f-4573-b676-b0d75c8872b1",
        title: 'Celebrate New-Years',
        due: new Date('01/01/2030'),
        urgency: 'low',
        completed: true,
        created: new Date(),
    },
    {
        id: "82e40ac8-483c-40ad-a759-4a9163c76390",
        title: 'Learn JavaScript',
        due: new Date('01/01/2025'),
        urgency: 'normal',
        completed: false,
        created: new Date(),
    },
]

class App extends LitElement {
    static styles = css`
    ul {
        margin: 0;
        padding: 0;
    }
    
    li {
        list-style: none;
        margin: 0;
        padding: 0,
    }
    `;

    /**
     * @returns {any}
     */
    render() {
        const list = TESTING.map(({completed, created, due, id, title, urgency}) =>{
            return html` 
            <li>
                <td-task title=${title} ?completed=${completed} urgency=${urgency} .due=${due} .created=${created}></td-task>
            </li>
            `
        })

        return html` 
    
        <td-spacing left="m" right="m" top="l" bottom="xl" >
        <div>
        <header>
            <h1>Todo App</h1>
            <td-adding @save=${console.log}></td-adding>

         </header>

         <main>
         <h2>Tasks ()</h2>
            <ul>
            ${list}
            </ul>
        </main>
        </div>
        </td-spacing>
    
    
    `
    }
}


customElements.define("td-app", App)