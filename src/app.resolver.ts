import { Inject, OnModuleInit } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { RootServiceInterface } from './app.interface';
import { NotaddGrpcClientFactory } from './grpc/grpc.client-factory';

@Resolver()
export class AppResolver implements OnModuleInit {
    onModuleInit() {
        this.rootServiceInterface = this.notaddGrpcClientFactory.rootServiceClient.getService<RootServiceInterface>('RootService');
    }

    constructor(
        @Inject(NotaddGrpcClientFactory) private readonly notaddGrpcClientFactory: NotaddGrpcClientFactory
    ) { }

    private rootServiceInterface: RootServiceInterface;

    @Query('sayHello')
    async sayHello(req, body: { name: string }) {
        const { msg } = await this.rootServiceInterface.sayHello({ name: body.name }).toPromise();
        return { code: 200, message: 'success', data: msg };
    }
}