import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

declare var io: any;

@Injectable({
  providedIn: 'root'
})
export class CollaborationService {

  collaborationSocket: any;
  private _userSource = new Subject<string>();

  constructor() { }

  init(editor: any, sessionId: string): Observable<string> {
    // Establish socket connection
    this.collaborationSocket = io(window.location.origin, { query: 'sessionId=' + sessionId });

    // Apply to local browser session when receive change from server
    this.collaborationSocket.on('change', (delta: string) => {
      console.log('collaboration: editor changes ' + delta);
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
    });

    this.collaborationSocket.on('userChange', (data: string) => {
      console.log('collaboration user change: ' + data);
      this._userSource.next(data.toString());
    });

    return this._userSource.asObservable();
  }

  // Send to server and forward to other participants
  change(delta: string): void {
    this.collaborationSocket.emit('change', delta);
  }

  // Restore buffer from redis cache
  restoreBuffer(): void {
    this.collaborationSocket.emit("restoreBuffer");
  }
}
