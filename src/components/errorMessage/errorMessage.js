import classes from './errorMessage.module.scss'
import error from './error.gif'

const ErrorMessage = ({...props}) => {
    return (
        <img {...props}
             className={classes.errorMessage}
             src={error}
             alt={'Problem of connect to server'}/>
    )
}
export default ErrorMessage;