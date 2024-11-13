import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

@WebSocketGateway()
export class TodoGateway {
  @WebSocketServer()
  server: { emit: (arg0: string, arg1: any) => void; };

  notifyClients(todo) {
    this.server.emit('todoUpdated', todo);
  }
}
