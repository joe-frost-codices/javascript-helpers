// function constructor // instantiation 

    let joe = {
        name: "Joe",
        yearOfBirth: 1973,
        job: "Graphic Designer"
    };

    let Person = function(name, yearOfBirth, job) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
        this.job = job;
    }

    Person.prototype.calculateAge = function() {
            console.log(2019 - this.yearOfBirth);
        }

    let john = new Person("John", 1962, "Accountant");
    john.calculateAge();
    
    console.log(john.hasOwnProperty("name"));
    console.log(john instanceof Person);
    
