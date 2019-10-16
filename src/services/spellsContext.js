import React, { Component } from 'react';
import db from './dbContext';

const spellsContext = {
    async getAllSpells(){
        return await db.spells.toArray();

    }
}
export default spellsContext;

