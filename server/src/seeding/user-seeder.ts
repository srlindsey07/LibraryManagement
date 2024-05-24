import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import User, { UserRole } from "../entities/User";
import bcrypt from "bcrypt";

export class UserSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const userRepository = dataSource.getRepository(User);
        const userFactory = factoryManager.get(User);

        // Create test users
        const testUserData: User[] = [
            { first_name: 'Admin', last_name: 'User', role: UserRole.ADMIN, email: 'admin@test.com', mobile: '123456789', password: await bcrypt.hash('Admin', 10) } as User,
            { first_name: 'Librarian', last_name: 'User', role: UserRole.LIBRARIAN, email: 'librarian@test.com', mobile: '123456789', password: await bcrypt.hash('Librarian', 10) } as User,
            { first_name: 'Borrower', last_name: 'User', role: UserRole.BORROWER, email: 'borrower@test.com', mobile: '123456789', password: await bcrypt.hash('Borrower', 10) } as User,
        ];
        const testUsers: User[] = await userRepository.save(testUserData);
        const borrowers: User[] = await userFactory.saveMany(10);
    }
}