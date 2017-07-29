const one = {
    'ref': 1,
    'name': 'Book: Climbing Injuries Solved',
    'description': 'A Book on Climbing-Focused Injury Prevention and Care.',
    'creator': 'Dr. Lisa Erikson DC',
    'category': 'animals',
    'coverImg': '/static/images/climber-sea.jpg',
    'date': '3.2.2016',
};
const two = {
    'ref': 2,
    'name': 'OneFam - Preserve Your Family Story',
    'description': 'OneFam is a family social networking application which enables family members to create, share and preserve their family history.',
    'creator': 'Thomas O\'Donoghue',
    'category': 'culture',
    'coverImg': '/static/images/family-shadow-sea.jpg',
    'date': '8.8.2013',
};
const three = {
    'ref': 3,
    'name': 'Save cute puppies',
    'description': 'Change the fate of some of the friendliest dogs',
    'creator': 'Animal Rescue',
    'category': 'animals',
    'coverImg': '/static/images/FacetheSunShadowCseeker.jpg',
    'date': '4.7.2011',
}
const four = {
    'ref': 4,
    'name': 'Andie’s Fight for a Cure',
    'description': ' Andie, her friends and family put on this golf tournament to directly fund DBAC & Children’s Health Foundation.',
    'creator': 'Jennifer Morrison',
    'category': 'medical',
    'coverImg': '/static/images/children-bubbles.jpg',
    'date': '14.3.2017',
}
const five = {
    'ref': 5,
    'name': 'The Movement Sanctuary',
    'description': 'Elevate the fitness level of an entire city by bringing the largest diversity of movement practices and art forms under the same roof',
    'creator': 'The Movement Sanctuary',
    'category': 'medical',
    'coverImg': '/static/images/Climbers-shadow.jpg',
    'date': '21.9.2012',
};
const six = {
    'ref': 6,
    'name': 'Saving Azi and his Mamma',
    'description': 'Azi and his mom survived a recent poaching incident and their traumatised and heart-broken owner sold them',
    'creator': 'Louise Joubert',
    'category': 'medical',
    'coverImg': '/static/images/Flickr_-_schmuela_-_more_sun_and_shadows.jpg',
    'date': '1.1.2015',
}

db.projects.insert(one);
db.projects.insert(two);
db.projects.insert(three);
db.projects.insert(four);
db.projects.insert(five);
db.projects.insert(six);

const cuki = {
    'username': 'Cuki',
    'password': 'MRAZQ_WIND0W$!',
};

const doncho = {
    'username': 'Doncho',
    'password': 'node1234',
};

const viktor = {
    'username': 'Viktor',
    'password': 'node1234',
};

db.users.insert(cuki);
db.users.insert(doncho);
db.users.insert(viktor);


const projectId = {
    _id: 'projectid',
    seq: 6,
};

db.projectCounter.insert(projectId);
