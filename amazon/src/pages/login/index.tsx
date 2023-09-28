import {FC} from "react";
import AuthLayout from "@/features/auth/components/AuthLayout";
import LoginFormComponent
    from "@/features/auth/components/LoginForm.component.tsx";

const Login: FC<{  }> = props => {
    return (
        <AuthLayout>
<LoginFormComponent/>
        </AuthLayout>
    );
};
export default  Login