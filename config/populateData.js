const one = {
    'id': 1.0,
    'name': 'Book: Climbing Injuries Solved',
    'description': 'A Book on Climbing-Focused Injury Prevention and Care.',
    'creator': 'Dr. Lisa Erikson DC',
    'coverImg': '/static/images/climber-sea.jpg',
};
const two = {
    'id': 2.0,
    'name': 'OneFam - Preserve Your Family Story',
    'description': 'OneFam is a family social networking application which enables family members to create, share and preserve their family history.',
    'creator': 'Thomas O\'Donoghue',
    'coverImg': '/static/images/family-shadow-sea.jpg',
};

db.projects.insert(one);

db.projects.insert(two);
