import { Logger } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as chalk from 'chalk';

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    const logger = new Logger('LoggerMiddleware');
    const method = req.method;
    const path = req.path;
    const ip = req.ip;
    const now = Date.now();
    const message = `\nDate: ${Date().toString()}\nRemote address: ${ip}\nMethod: ${chalk.yellow(method)} Path: ${chalk.rgb(255,157,216)(path)}`; 
    logger.log(`${chalk.bgGreen(`${chalk.black(' <- ')}`)} ` + message);
    res.on('finish', () => {
        const status = res.statusCode;
        const responseTime = Date.now() - now;
        const endMessage = /* message + */ ` Status: ${chalk.cyan(status)} Response time: ${chalk.yellow(`+${responseTime}ms`)}\n`;
        logger.log(`${chalk.bgGreenBright(`${chalk.black(' -> ')}`)}` + endMessage);
    });
    next();
}
