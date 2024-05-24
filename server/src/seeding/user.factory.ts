import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import User, { UserRole } from "../entities/User";
import bcrypt from "bcrypt";

export const UserFactory = setSeederFactory(User, async (faker: Faker) => {
    const password = faker.internet.password();

    const user = new User();
    user.first_name = faker.person.firstName();
    user.last_name = faker.person.lastName();
    user.role = UserRole.BORROWER;
    user.email = faker.internet.email();
    user.mobile = faker.phone.number();
    user.password = await bcrypt.hash(password, 10);
    return user;
});