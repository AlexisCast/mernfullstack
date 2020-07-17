import React, { useCallback, useReducer } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
	VALIDATOR_REQUIRE,
	VALIDATOR_MINLENGTH,
} from "../../shared/utils/validators";
import "./NewPlace.css";
import { findAllByTestId } from "@testing-library/react";

const formReducer = (state, action) => {
	switch (action.type) {
		case "INPUT_CHANGE":
			let formIsValid = true;
			for (const inputId in state.inputs) {
				if (inputId === action.inputId) {
					formIsValid = formIsValid && action.isValid;
				} else {
					formIsValid = formIsValid && state.inputs[inputId].isValid;
				}
			}
			return {
				...state,
				inputs: {
					...state.inputs,
					[action.inputId]: {
						value: action.value,
						isValid: action.isValid,
					},
				},
				isValid: formIsValid,
			};
		default:
			return state;
	}
};

const NewPlace = () => {
	const [formState, dispatch] = useReducer(formReducer, {
		inputs: {
			title: {
				value: "",
				isValue: false,
			},
			description: {
				value: "",
				isValid: false,
			},
		},
		isValid: false,
	});

	const inputHandler = useCallback((id, value, isValid) => {
		dispatch({
			type: "INPUT_CHANGE",
			value: value,
			isValid: isValid,
			inputId: id,
		});
	}, []);

	const placeSubmitHandler = (event) => {
		event.preventDefault();
		console.log("formState", formState);
		console.log("formState.inputs", formState.inputs);
	};

	return (
		<form className="place-form" onSubmit={placeSubmitHandler}>
			<Input
				id="title"
				element="input"
				type="text"
				label="Title"
				validators={[VALIDATOR_REQUIRE()]}
				errorText="Please enter a valid title"
				onInput={inputHandler}
			/>
			<Input
				id="description"
				element="textArea"
				type="text"
				label="Description"
				validators={[VALIDATOR_MINLENGTH(5)]}
				errorText="Please enter a valid description at least 5 characteres"
				onInput={inputHandler}
			/>
			<Input
				id="address"
				element="input"
				type="text"
				label="Address"
				validators={[VALIDATOR_REQUIRE()]}
				errorText="Please enter a valid address"
				onInput={inputHandler}
			/>
			<Button type="submit" disabled={!formState.isValid}>
				ADD PLACE
			</Button>
		</form>
	);
};

export default NewPlace;
