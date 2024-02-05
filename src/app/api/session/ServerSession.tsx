import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";

async function ServerSession() {
    const session = await getServerSession(options)

    return (
        <div>
            {session?.user?.name}
        </div>
    )
}

