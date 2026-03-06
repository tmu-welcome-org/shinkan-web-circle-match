import { useLocation, useNavigate } from "react-router-dom";

export type SideMenuModeButtonProps = {
    button_label: React.ReactNode;
    children: React.ReactNode;
    targetPath: string;
}

export default function SideMenuModeButton({ button_label, children, targetPath}: SideMenuModeButtonProps) {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = location.pathname === targetPath;

    const handleClick = () => {
        navigate(targetPath);
    };

    return (
        <div>
            <button onClick={handleClick} className={`w-full group flex gap-x-4 items-center justify-center cursor-pointer p-5 bg-white border-green-700 transition-all hover:border-l-8 ${isActive ? 'border-l-8' : ''}`}>
                {button_label}
            </button>
            <div className={`grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out peer-checked:grid-rows-[1fr] ${isActive ? 'grid-rows-[1fr]' : ''}`}>
                <div className="flex flex-col gap-y-4 overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    )
}