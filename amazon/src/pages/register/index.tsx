import React from "react";
import AuthLayout
    from "@/features/auth/AuthLayout.tsx";
import RegistrationFormComponent
    from "@/features/auth/components/RegistrationForm.component.tsx";

 const Register: React.FC<{  }> = props => {
    return (
        <AuthLayout>
            <RegistrationFormComponent/>
        </AuthLayout>
    );
};
 export default Register