export const Separator = ({ className }: { className?: string }) => {
    const classes = "bg-slate-200 h-px my-5 " + (className || "");
    return <div className={classes} />
}