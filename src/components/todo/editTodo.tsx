import { FC } from "react"
import {useTodoForm} from '../../models/useTodoFormModel'

type HTMLInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export interface IProps extends Pick<HTMLInputProps, Exclude<keyof HTMLInputProps, 'value' | 'onChange' | 'onKeyDown'>> {
  model: ReturnType<typeof useTodoForm>;
  onEnter?: () => void;
  onCancel?: () => void;
}

const EditTodo: FC<IProps> = (props) => {
  const {onEnter, onCancel,model, ...restProps} = props;
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    model.update(e.target.value);
  };
  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    const {onEnter, onCancel} = props;
    switch (e.keyCode) {
      case 13: {
        if (onEnter) {
          onEnter();
        }
        break;
      }
      case 27: {
        if (onCancel) {
          onCancel();
        }
        break;
      }
      default:
        break;
    }
  };
  return (
    <input {...restProps} value={model.title} onChange={handleChange} onKeyDown={handleKeyDown}/>
  )
}
export default EditTodo