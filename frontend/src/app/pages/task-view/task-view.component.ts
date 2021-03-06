import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Task } from 'src/app/models/task.model';
import { List } from 'src/app/models/list.model';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit, AfterViewInit {

  lists!: List[];
  tasks!: Task[];
  isOnListsPage: boolean = false;
  isListsButtonClicked: boolean = false;
  listMenuMobile: boolean = false;
  selectedListId!: string;

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router, private authService: AuthService) { 
  
  }
  ngAfterViewInit(): void {
    console.log(document);
    const myElement = document.getElementById('list-menu-mobile') as HTMLElement;
    console.log("myElement: ", myElement);


    const displayValue = getComputedStyle(myElement).display;
    if (displayValue !== 'none') {
      this.listMenuMobile = true;
    }
  }



  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params['listId']) {
          this.selectedListId = params['listId'];
          this.taskService.getTasks(params['listId']).subscribe((tasks: any) => {
            this.tasks = tasks;
          });
        } else {
          this.isOnListsPage = true;
        }

      }
    );

    this.taskService.getLists().subscribe((lists: any) => {
      this.lists = lists;
    })
   
  }

  onTaskClick(task: Task) {
    // we want to set the task to completed
    this.taskService.complete(task).subscribe(() => {
      // the task has been set to completed successfully
      console.log("Completed successully!");
      task.completed = !task.completed;
    });
  }

  onDeleteListClick() {
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['/lists']);
      console.log(res);
    })
  }

  onDeleteTaskClick(id: string) {
    this.taskService.deleteTask(this.selectedListId, id).subscribe((res: any) => {
      this.tasks = this.tasks.filter(val => val._id !== id);
      console.log(res);
    })
  }

  onSignOutButtonClicked() {
    this.authService.logout();
  }

  listMenuClicked() {
    this.isListsButtonClicked ? this.isListsButtonClicked = false : this.isListsButtonClicked = true;
  }

}
