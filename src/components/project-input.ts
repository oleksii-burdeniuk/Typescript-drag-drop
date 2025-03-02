import { autoBind } from '../decorators/autobind';
import { projectState } from '../state/project-state';
import { validate } from '../utils/validation';
import { Component } from './base-component';

// project input class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleElementField: HTMLInputElement;
  descriptionElementField: HTMLInputElement;
  peopleElementField: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');

    this.configure();

    this.titleElementField = document.querySelector(
      '#title'
    ) as HTMLInputElement;
    this.descriptionElementField = document.querySelector(
      '#description'
    ) as HTMLInputElement;
    this.peopleElementField = document.querySelector(
      '#people'
    ) as HTMLInputElement;
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }
  renderContent(): void {}
  private clearInputs(inputField: HTMLInputElement[]) {
    inputField.forEach((element: HTMLInputElement) => (element.value = ''));
  }
  private gatherUserInout(): [string, string, number] {
    const enteredTitle = this.titleElementField.value;
    const enteredDescription = this.descriptionElementField.value;
    const enteredPeople = +this.peopleElementField.value;

    if (
      !validate({
        value: enteredTitle,
        required: true,
        maxLength: 100,
        minLength: 1,
      }) ||
      !validate({
        value: enteredDescription,
        required: true,
        maxLength: 100,
        minLength: 1,
      }) ||
      !validate({
        value: enteredPeople,
        required: true,
        min: 0,
        max: 10,
      })
    ) {
      alert('Invalid input Please try again');
      throw new Error('Invalid input Please try again');
    } else {
      return [enteredTitle, enteredDescription, enteredPeople];
    }
  }

  @autoBind
  private submitHandler(event: Event) {
    event.preventDefault();

    const userInputs: [string, string, number] = this.gatherUserInout();

    if (!userInputs) return;
    const [title, description, people] = userInputs;
    console.log(title, description, people);
    projectState.addProject(title, description, people);

    this.clearInputs([
      this.titleElementField,
      this.descriptionElementField,
      this.peopleElementField,
    ]);
  }
}
