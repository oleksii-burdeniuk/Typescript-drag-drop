import { Project, ProjectStatus } from '../models/project';

// Project state management
type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];
  addListener(listenerFnc: Listener<T>) {
    this.listeners.push(listenerFnc);
  }
}

export class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;
  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addListener(listenerFnc: Listener<Project>) {
    this.listeners.push(listenerFnc);
  }
  addProject(title: string, description: string, people: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      people,
      ProjectStatus.ActiveObject
    );

    this.projects.push(newProject);
    this.updateListeners();
  }
  moveProject(prjId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((prj) => prj.id === prjId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  updateListeners() {
    for (const listenerFnc of this.listeners) {
      listenerFnc([...this.projects]);
    }
  }
}

export const projectState = ProjectState.getInstance();
