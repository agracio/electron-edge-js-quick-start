using System;

namespace ExternalLibrary
{
    public class Person
    {
        public Person(string name, string email, int age)
        {
            Id =  Guid.NewGuid();
            Name = name;
            Email = email;
            Age = age;
        }
        public Guid Id {get;}
        public string Name {get;}
        public string Email {get;}
        public int Age {get;}
    }
}