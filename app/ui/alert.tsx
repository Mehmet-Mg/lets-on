import Link from "next/link";

interface IAlertProps {
    title: string;
    message: string;
    href?: string;
}

export default function Alert(props: IAlertProps) {
    const {title, message, href} = props;
    return (
        <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
            <p className="font-bold">{title}</p>
            <div>
                <p>{message}</p>
                {href ? <Link href={href}>fix me</Link> : <></>}
            </div>
        </div>
    )
}