// Types
import { TTodoForm } from '../../../types/todo.type'

export type TFormProps = TTodoForm

export type TFormEmits = {
	(e: 'submit', title: string): void
	(e: 'update:form', key: string, value: string): void
}
