import { createComponent } from "../utlis/components.js";
import { getState, dispatch } from "../model/store.js";
import { addTask } from "../model/actions.js";

createComponent({
  element: "td-app",

  events: {
    submit: (event, getHtml) => {
      event.preventDefault();

      /**
       * @type {any}
       */
      const eventAsAny = event;
      /**
       * @type {string | undefined}
       */
      const key = eventAsAny?.target?.dataset?.key;

      if (key === "add") {
        if (!(event.target instanceof HTMLFormElement)) {
          throw new Error("Is required to be a form");
        }
        const response = new FormData(event.target);
        const { title } = Object.fromEntries(response);

        event.target.reset();
        dispatch(addTask({ title: title.toString() }));
        console.log(getState());
      }
    },
  },

  connect: (prev, next, getHtml) => {
    const nextTasks = Object.values(next.tasks);
    const prevTaskIds = Object.keys(prev.tasks);
    const nextTaskIds = Object.keys(next.tasks);
    const [ul] = getHtml("list");

    nextTasks.forEach((item) => {
      if (prevTaskIds.includes(item.id)) return;
      const li = document.createElement("li");
      li.dataset.id = item.id;
      li.innerText = item.title;
      ul.appendChild(li);
    });

    prevTaskIds.forEach((id) => {
      if (nextTaskIds.includes(id)) return;
      const node = ul.querySelector(`[data-id=${id}]`)

      if (!(node instanceof HTMLElement)) {
        throw new Error("Required to be HTMLElement")
      }

      node.remove()
    });
  },

  template: /* html */ `
<form data-key="add">
<lable>
<span>Enter your name:</span>
<input type="text" name="title"  />
</label>

<button>Submit</button>
</form>

<ul data-key="list"></ul>
`,
});
