export type CircleContactButtonProps = {
    url: string | null;
    label: string;
    contactIcon: React.ReactNode;
    textClass: string;
    bgClass: string;
}

export default function CircleContactButton({ url, label, contactIcon, textClass, bgClass }: CircleContactButtonProps) {
    
    const ButtonTag = url ? 'a' : 'div';

    const tagProps = url ? { href: url } : {};
    
    return (
        <>
            <ButtonTag {...tagProps} className={`group flex border relative overflow-clip rounded-md p-3 gap-1 items-center justify-between transition-all ${bgClass} `}>
                {contactIcon}
                <span className={`z-50 text-sm font-medium transition-colors ${textClass}`}>{label}</span>
            </ButtonTag>
        </>
    )
}