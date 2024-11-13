import * as nano from 'nano';
import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  providers: [
    {
      provide: 'COUCHDB_CONNECTION',
      useFactory: () => nano('http://admin:admin@127.0.0.1:5984/'),
    },
  ],
  exports: ['COUCHDB_CONNECTION'],
})
export class DatabaseModule {}
