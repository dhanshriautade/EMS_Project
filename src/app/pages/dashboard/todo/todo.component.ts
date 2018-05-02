import { Component } from '@angular/core';
import { BaThemeConfigProvider } from '../../../theme';
import { TodoService } from './todo.service';
import { Services } from 'app/service/service.service';
import { Session } from 'app/service/session.session';

@Component({
  selector: 'todo',
  templateUrl: './todo.html',
  styleUrls: ['./todo.scss']
})
export class Todo {

  public dashboardColors = this._baConfig.get().colors.dashboard;

  public todoList: Array<any>;
  public newTodoText: string = '';

  constructor(private session: Session, private _baConfig: BaThemeConfigProvider, private _todoService: TodoService, private service: Services) {
    this.todoList = JSON.parse(this.session.getToDoList());
    this.todoList.forEach((item) => {
      item.color = this._getRandomColor();
    });
  }

  getNotDeleted() {
    return this.todoList.filter((item: any) => {
      return !item.deleted
    })
  }

  removeToDoItem(color, text) {
    console.log(this.todoList);
    this.todoList.splice(this.todoList.indexOf({ color: color, text: text }), 1);
    this.addItem();
    console.log(this.todoList);
  }

  addItem() {
    this.service.AddToDo(this.todoList).subscribe(res => {
      if (res.success) {
        this.newTodoText = '';
        sessionStorage.removeItem('todo');
        sessionStorage.setItem('todo', JSON.stringify(this.todoList));
      } else {
        alert('error');
      }
    });
  }

  addToDoItem($event) {
    if (($event.which === 1 || $event.which === 13) && this.newTodoText.trim() != '') {
      this.todoList.unshift({
        text: this.newTodoText,
        color: this._getRandomColor(),
      });
      this.addItem();
    }
  }

  private _getRandomColor() {
    let colors = Object.keys(this.dashboardColors).map(key => this.dashboardColors[key]);
    var i = Math.floor(Math.random() * (colors.length - 1));
    return colors[i];
  }
}
