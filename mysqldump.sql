use cstscheduling;

drop table instructorleaves;

CREATE TABLE `cstscheduling`.`instructorleaves` (
  `idinstructorleavesID` INT NOT NULL AUTO_INCREMENT,
  `instructorLeavesStart` DATE NOT NULL,
  `instructorLeavesEnd` DATE NOT NULL,
  `comments` VARCHAR(2500) NULL,
  `instructors` INT(11) NOT NULL,
  PRIMARY KEY (`idinstructorleavesID`),
  INDEX `instructorID_idx` (`instructors` ASC) VISIBLE,
  CONSTRAINT `fk_instructorID`
    FOREIGN KEY (`instructors`)
    REFERENCES `cstscheduling`.`instructor` (`instructorID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    
CREATE TABLE `cstscheduling`.`instructorvacations` (
  `instructorvacationsID` INT(11) NOT NULL AUTO_INCREMENT,
  `instructorvacationsStart` DATE NOT NULL,
  `instructorvacationsEnd` DATE NOT NULL,
  `comments` VARCHAR(2500) NULL,
  `instructors` INT(11) NOT NULL,
  PRIMARY KEY (`instructorvacationsID`),
  INDEX `fkinstructorvacation_idx` (`instructors` ASC) VISIBLE,
  CONSTRAINT `fkinstructorvacation`
    FOREIGN KEY (`instructors`)
    REFERENCES `cstscheduling`.`instructor` (`instructorID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
COMMENT = '	';

drop table instructorofficedays;

CREATE TABLE `cstscheduling`.`instructorofficedays` (
  `instructorofficedaysID` INT(11) NOT NULL AUTO_INCREMENT,
  `instructorofficedaysStart` DATE NOT NULL,
  `instructorofficedaysEnd` DATE NULL,
  `comments` VARCHAR(2500) NULL,
  `instructors` INT(11) NOT NULL,
  PRIMARY KEY (`instructorofficedaysID`),
  INDEX `fk_instructor_office_days_idx` (`instructors` ASC) VISIBLE,
  CONSTRAINT `fk_instructor_office_days`
    FOREIGN KEY (`instructors`)
    REFERENCES `cstscheduling`.`instructor` (`instructorID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
COMMENT = '	';

