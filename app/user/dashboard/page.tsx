import Alert from "@/app/ui/alert";

export default function Page() {
    return (
        <div className="mx-8 space-y-2">
            <Alert title="Warning" message="Please check user detail" href="/dashboard"/>
            <Alert title="Warning" message="Please check name"/>
            <Alert title="Warning" message="Please check name"/>
        </div>
    )
}