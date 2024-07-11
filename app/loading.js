import classes from "./loading.module.css"

export default function Loading() {
    return (
        // this is the basic Loading for the whole page
        <div className={classes['spinner-wrapper']}>
            <div class={classes.spinner}></div>
        </div>
    )
}