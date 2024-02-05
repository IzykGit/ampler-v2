
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials"
import executeQuery from "../../sql/db";

export const options: NextAuthOptions = {
    session:  {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                firstName: {
                    label: "First Name:",
                    type: "text",
                    placeholder: ""
                },
                lastName: {
                    label: "Last Name:",
                    type: "text",
                    placeholder: ""
                },
                password: {
                    label: "Your Clock In Number:",
                    type: "password",
                    placeholder: ""
                }
            },
            async authorize(credentials, req) {
                const { firstName, lastName, password } = credentials || {};

                const query = "SELECT * FROM employees WHERE first_name = ? and last_name = ? and clock_in_pin = ?"
                const [employee]: any = await executeQuery(query, [firstName, lastName, password])
            
                if(employee) {
                    return {
                        id: employee.clock_in_pin,
                        name: `${employee.first_name} ${employee.last_name}`,
                        role: employee.role
                    }
                }
            }
        })
    ],
}