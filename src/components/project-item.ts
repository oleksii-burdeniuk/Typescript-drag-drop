//project Item class

import { autoBind } from '../decorators/autobind';
import { Draggable } from '../models/drag-drop';
import { Project } from '../models/project';
import { Component } from './base-component';

export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  get persons() {
    if (this.project.people === 1) {
      return '1 person';
    }
    return `${this.project.people} persons`;
  }

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, true, project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }

  configure(): void {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }
  renderContent(): void {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = `${this.persons} assighned`;
    this.element.querySelector('p')!.textContent = this.project.description;
  }

  @autoBind
  dragEndHandler(_event: DragEvent): void {
    console.log('drag end');
  }
  @autoBind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData('text/plain', this.project.id);
    event.dataTransfer!.effectAllowed = 'move';
    console.log('event', event);
  }
}
