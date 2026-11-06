# Virtual Dog Park

A dog encyclopedia and virtual pet website built for a first-year programming lab.

## Features

- Dog encyclopedia: Beagle, Golden Retriever and Poodle, each with a project-created SVG illustration and short care notes.
- Adoption: choose a breed and enter a name (1-20 characters after trimming spaces) to adopt one dog.
- Feed and Play: each click adds 10 happiness, up to a maximum of 100.
- Next Day: adds 1 day and removes 5 happiness (minimum 0). Day 1 = Puppy, Days 2-3 = Young Dog, Day 4+ = Adult Dog, shown with text and a growth bar.
- Saved progress: the dog is stored in browser localStorage (key `virtualDogParkPetV1`) and restored after refresh. Only one dog is saved at a time.
- Start Over: asks for confirmation before deleting saved progress. Cancel keeps the dog.

## How to preview

1. Open the project folder in VS Code.
2. Install the "Live Server" extension (by Ritwick Dey).
3. Right-click `index.html` and choose "Open with Live Server". The page opens at a local address such as `http://127.0.0.1:5500`.

Keep using the same browser and local address, otherwise saved progress may not be found.

## Growth and happiness rules

- Starting state: Day 1, Puppy, happiness 50.
- Feed / Play: +10 happiness each, capped at 100.
- Next Day: +1 day, -5 happiness, minimum 0.
- Growth: Day 1 Puppy; Days 2-3 Young Dog; Day 4 onward Adult Dog.

## Where progress is stored

Pet progress lives in your browser's localStorage on this device only. It is not an online account, and it is never uploaded to GitHub.

## Manual testing checklist

- [ ] Three breeds with three illustrations display correctly.
- [ ] Empty name is rejected; names over 20 characters are blocked.
- [ ] Adopting shows Day 1, Puppy, happiness 50.
- [ ] Feed/Play stop at 100; Next Day stops at 0.
- [ ] Day 2 shows Young Dog; Day 4 shows Adult Dog.
- [ ] Refreshing restores the latest dog state.
- [ ] Start Over: Cancel keeps the dog; Confirm clears it.
- [ ] Page stays usable on a narrow screen.

## Notes

The SVG illustrations in `assets/` are project-created illustrations, not real dog photographs.
