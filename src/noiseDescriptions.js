const scaleDesc = "\
Scale determines the size of the features in the generated noise, \
where larger scale values result in larger features, while \
smaller values create smaller, more detailed features. \
Increasing scale can be thought of as zooming out, \
making the noise look more 'global' or 'coarse.'"

const octavesDesc = "\
Octaves control the number of levels of detail in the noise, \
with higher octave values introducing more detail and complexity. \
Each octave contributes to the final noise at a different frequency \
and amplitude, and more octaves add finer details, \
simulating complexity at different scales."

const persistenceDesc = "\
Persistence determines how much each octave contributes to the overall shape, \
where higher persistence values give more influence to higher octaves, \
making the noise rougher, and lower values make the noise smoother. \
Persistence affects the roughness or smoothness of the noise, \
and higher persistence values result in a more pronounced texture."

const lacunarityDesc = "\
Lacunarity controls the increase in frequency between octaves, with higher \
lacunarity values increasing the gap in frequency between octaves, \
creating more pronounced features at higher scales. Lacunarity influences \
the diversity of features across different scales, and higher values \
make the noise more varied."

const ampDesc = "\
Amplitude (amp) represents the height or intensity of the noise, with \
higher amplitude values resulting in a more pronounced and noticeable noise pattern. \
Amplitude influences the overall strength or contrast of the generated noise. "

const freqDesc = "\
Frequency controls how rapidly the noise changes, with higher frequency \
values resulting in more rapid changes and creating finer details in the noise. \
Frequency influences the speed of variation in the noise, and higher frequencies \
introduce more fine-grained details."

export {scaleDesc, octavesDesc, persistenceDesc, lacunarityDesc, ampDesc, freqDesc}