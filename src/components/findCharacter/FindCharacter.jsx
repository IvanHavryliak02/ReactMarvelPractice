import './findCharacter.scss'
import useMarvelService from '../../services/useMarvelService'
import { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form"
import { NavLink } from 'react-router';

export default function FindCharacter({setFindedCharObj}){
    
    const [findedChar, setFindedChar] = useState();
    const {serviceInit, serviceRef} = useMarvelService()
    const {control, handleSubmit, formState: {errors} } = useForm()
    const onSubmit = data => {
        findChar(data.charName)
    }

    useEffect(() => {
        serviceInit(() => {}, 'FindCharacter')
    }, [])

    const findChar = (charName) => {
        if(serviceRef.current) {
            const charObj = serviceRef.current.findCharByName(charName);
            if(charObj) {
                setFindedChar(charObj)
            } else {
                setFindedChar(null)
            }
        }
    }

    return (
        <div className='find'>
            <span className='find__title'>Or find a character by name:</span>
            <div className="find__grid">
                <form className='find__form' onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="charName"
                        control={control}
                        rules={
                            {
                                required: "This field is required213",
                                minLength: {
                                    value: 2,
                                    message: "Minimum two signs"
                                }
                            }
                        }
                        render={({field}) => ( 
                                <input  
                                    className='find__input' 
                                    placeholder="Enter name"
                                    {...field}
                                />
                            )
                        }
                    />
                    <button className='find__button' type="submit">FIND</button>
                </form>
                {console.log(errors.charName)}
                {errors.charName && <span className="find__error">{errors.charName.message}</span>}
                {findedChar ? <span className="find__message">There is! Visit {findedChar.name} page?</span> : null}
                {findedChar ? 
                    <NavLink 
                        to='/character'
                        end
                        style={{display: 'block', height: '100%'}}
                    >
                        <button onClick={() => setFindedCharObj(findedChar)} className='find__button find__button_gray'>TO PAGE</button>
                    </NavLink>
                : null}
                {findedChar === null ? <span className="find__error">The character was not found. Check the name and try again</span> : null}
            </div>
        </div>
    )
}