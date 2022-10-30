import classes from './errorMessage.module.scss'
import error from './error.gif'

const ErrorMessage = ({...props}) => {

    return (
        <div>
            <img {...props}
                 className={classes.errorMessage}
                 src={error}
                 alt={'Problem of connect to server'}/>
            <h2 className={classes.styleMessage}>Somethings went wrong!</h2>
        </div>
    )
}

export default ErrorMessage;