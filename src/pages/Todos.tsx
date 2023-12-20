import AnimatedText from '@/components/ui/AnimatedText';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Todo } from '@/lib/models';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { createTodo, deleteTodo, fetchAllTodos } from '@/lib/http';
import toast from 'react-hot-toast';


const Todos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [name, setName] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);

    const init = async () => {
        setIsLoading(true);
        const data = await fetchAllTodos(localStorage.getItem("token")!);
        console.log(data);
        setIsLoading(false);
        setTodos(data);
    };

    useEffect(() => {
        init();
    }, []);

    const onDelete = async (todo: Todo) => {
        console.log(todo);
        const deleted = await deleteTodo(todo, localStorage.getItem('token')!);
        if (deleted) {
            toast.success("Todo Deleted");
            init();
        }
        else {
            toast.error("Error Deleting the todo");
        }
    }


    return (
        <motion.div
            initial={{ opacity: 0, transform: `translateY(50px)` }}
            whileInView={{ opacity: 1, transform: `translateY(0px)` }}
            exit={{ opacity: 0, transform: `translateY(50px)` }}
            className={`flex w-full flex-row items-center justify-around`}
        >
            <section className="flex flex-col w-full">
                <div className="flex mb-10 flex-col justify-center w-full">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-4 text-center text-3xl font-bold leading-9 tracking-tight ">
                            <AnimatedText>Create Todo</AnimatedText>
                        </h2>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div className='space-y-3 flex flex-col'>
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Make Dinner" value={name}
                                    onChange={(elt) => {
                                        setName(elt.target.value);
                                    }} />
                            </div>
                            <Button
                                className="text-lg"
                                type="submit"
                                onClick={async () => {
                                    var todo: Todo = {
                                        id: 0,
                                        name
                                    }
                                    const data = await createTodo(todo, localStorage.getItem('token')!);
                                    if (data != null) {
                                        // todos.push(data);
                                        init();
                                        toast.success("Todo created");
                                    } else {
                                        toast.error("Error creating todo");
                                    }
                                }}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="w-[80%] m-auto mb-10">
                    {
                        isLoading ? (
                            <div className="flex items-center justify-center h-[50vh]">
                                <Loader2 className="h-20 w-20 animate-spin" />
                            </div>
                        )
                            :
                            <>
                                <h1 className="text-5xl p-3 text-center">
                                    <AnimatedText>
                                        {todos.length == 0 ? "List is Empty" : "List of Todos"}
                                    </AnimatedText>
                                </h1>

                                {todos.length != 0 && (
                                    <Table className="w-[50%] m-auto">
                                        <TableCaption>A list of your recent todos.</TableCaption>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[100px]">Id</TableHead>
                                                <TableHead>Name</TableHead>
                                                <TableHead className="text-center">Action</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {todos.map((todo) => (
                                                <TableRow key={todo.id}>
                                                    <TableCell className="font-medium">{todo.id}</TableCell>
                                                    <TableCell>{todo.name}</TableCell>
                                                    <TableCell className="flex flex-row space-x-2 items-center justify-center">
                                                        <Button
                                                            onClick={() => {
                                                                console.log(todo);
                                                                onDelete(todo);
                                                            }}
                                                            variant={"destructive"}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                )}
                            </>
                    }

                </div>
            </section>

        </motion.div>
    )
}

export default Todos;