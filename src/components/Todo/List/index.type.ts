// Types
import { TTodo } from '../../../types/todo.type'

export type TListProps = {
	list: TTodo[]
}

export type TListEmits = {
	(e: 'update-status', id: number): void
	(e: 'delete', id: number): void
}
