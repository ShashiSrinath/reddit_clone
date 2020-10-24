import {Test, TestingModule} from '@nestjs/testing';
import {UserService} from './user.service';
import {PrismaModule} from "../prisma/prisma.module";
import {PrismaService} from "../prisma/prisma.service";
import {ConfirmPasswordMismatchException} from "./exceptions/exceptions";

describe('UsersService', () => {
    const mockedPrismaService = {
        user: {
            findOne: jest.fn(),
            create: jest.fn()
        }
    };
    let userService: UserService;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [PrismaModule],
            providers: [UserService],
        }).overrideProvider(PrismaService)
            .useValue(mockedPrismaService)
            .compile();

        userService = module.get<UserService>(UserService);
    });

    it('should be defined', () => {
        expect(userService).toBeDefined();
    });

    describe('createLocalUser', () => {
        it('calls the prisma.User.create() method with correct arguments', async () => {
            await userService.createLocalUser({
                email: 'a@a.a',
                username: 'test',
                password: 'a',
                password2: 'a'
            });
            expect(mockedPrismaService.user.create).toBeCalledWith({
                data: {
                    email: 'a@a.a',
                    username: 'test',
                    password: 'a',
                    role: 'user',
                    karma: 0
                }
            });
        });

        it('throws "ConfirmPasswordMismatchException" when passwords do not match', async () => {
            ;
            await expect(async () => {
                await userService.createLocalUser({
                    email: 'a@a.a',
                    username: 'test',
                    password: 'a',
                    password2: 'b'
                });
            }).rejects
                .toThrow(new ConfirmPasswordMismatchException())
        });
    });
});
