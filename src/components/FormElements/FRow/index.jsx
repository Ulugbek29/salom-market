import cls from "./style.module.scss"


const FRow = ({ label, children, position="vertical", required }) => {
  return (
    <div className={`${cls.frow} ${position}`} >
      <div className={cls.label}> {required && <span className="requiredStart">*</span>} {label}:</div>
      <div className={cls.component}>{children}</div>
    </div>  
  )
}



export default FRow
