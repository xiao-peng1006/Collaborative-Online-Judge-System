import { Injectable } from '@angular/core';

declare var io: any;

@Injectable({
  providedIn: 'root'
})
export class CollaborationService {

  collaborationSocket: any;

  constructor() { }

  init(editor: any, sessionId: string): void {
    // Establish socket connection
    this.collaborationSocket = io(window.location.origin, { query: 'sessionId=' + sessionId });

    // Apply to local browser session when receive change from server
    this.collaborationSocket.on('change', (delta: string) => {
      console.log('collaboration: editor changes ' + delta);
      delta = JSON.parse(delta);
      editor.lastAppliedChange = delta;
      editor.getSession().getDocument().applyDeltas([delta]);
    });
  }

  // Send to server and forward to other participants
  change(delta: string): void {
    this.collaborationSocket.emit('change', delta);
  }
}
