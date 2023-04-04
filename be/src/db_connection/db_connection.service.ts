import { Injectable, OnModuleInit } from "@nestjs/common";
import * as mysql from "mysql2/promise";

@Injectable()
export class DBConnectionService implements OnModuleInit {
  public ConnectDB: mysql.Pool;
  constructor() {}
  
  async onModuleInit() {
    this.ConnectDB = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      connectionLimit: 50
    });
    console.log('🚗 DB와 연결되었다 🚗')
  }
  
  // constructor(private readonly configService: ConfigService) {
  //   dbConnectionService = mysql.createPool({
  //     // host: this.configService.get<string>('DB_HOST'),
  //     // port: this.configService.get<number>('DB_PORT'),
  //     // user: this.configService.get<string>('DB_USERNAME'),
  //     // password: this.configService.get<string>('DB_PASSWORD'),
  //     // database: this.configService.get<string>('DB_DATABASE'),
  //     host: process.env.DB_HOST,
  //     port: Number(process.env.DB_PORT),
  //     user: process.env.DB_USERNAME,
  //     password: process.env.DB_PASSWORD,
  //     database: process.env.DB_DATABASE,
  //   })
  //   console.log('연결됨')
  // }
}