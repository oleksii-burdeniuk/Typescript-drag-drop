import { autoBind } from '../decorators/autobind';
import { DragTarget } from '../models/drag-drop';
import { Project, ProjectStatus } from '../models/project';
import { projectState } from '../state/project-state';
import { Component } from './base-component';
import { ProjectItem } from './project-item';

//project list class
export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project[];

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`);
    this.assignedProjects = [];
    this.configure();
    this.renderContent();
  }

  configure() {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('drop', this.dropHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((prj) => {
        if (this.type === 'active') {
          return prj.status === ProjectStatus.ActiveObject;
        }
        return prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProject();
    });
  }
  @autoBind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] !== 'text/plain')
      return;
    event.preventDefault();
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.add('droppable');
  }
  @autoBind
  dragLeaveHandler(_event: DragEvent): void {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  }

  @autoBind
  dropHandler(event: DragEvent): void {
    const prjId = event.dataTransfer?.getData('text/plain');
    console.log(prjId);
    if (!prjId) return;
    projectState.moveProject(
      prjId,
      this.type === 'active'
        ? ProjectStatus.ActiveObject
        : ProjectStatus.Finished
    );
  }

  renderContent() {
    const listId = `${this.type}-projectList`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type.toLocaleUpperCase() + ' PROJECTS';
  }

  private renderProject() {
    const listEl = document.getElementById(
      `${this.type}-projectList`
    ) as HTMLLIElement;
    listEl.innerHTML = '';
    for (const projectItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, projectItem);
    }
  }
}
