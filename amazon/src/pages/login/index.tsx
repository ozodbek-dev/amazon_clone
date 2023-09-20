import {FC} from "react";
import AuthLayout
    from "@/features/auth/AuthLayout.tsx";
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