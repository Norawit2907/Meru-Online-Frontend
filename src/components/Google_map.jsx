import { useState } from "react";
import { useEffect } from "react";
import { GetWatAddress } from "../services/address";
import React from 'react'

const Google_map = (latitude, longtitude) => {
    return (
        <iframe
            src={`https://www.google.com/maps?q=${latitude},${longtitude}&z=18&output=embed`}
            width="835"
            height="250"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
        </iframe>
    )
}

export default Google_map