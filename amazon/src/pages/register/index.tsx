import React from "react";
import AuthLayout from "@/features/auth/components/AuthLayout";
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