package com.appiumtest;


import java.net.MalformedURLException;
import java.net.URL;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.remote.DesiredCapabilities;

import io.appium.java_client.AppiumDriver;
import io.appium.java_client.remote.MobileCapabilityType;

public class AppTest {
    static AppiumDriver driver;
    
    public static void main(String[] args){
        try{
        openTestApp();
        }
        catch(Exception exp)
        {
            exp.getCause();
            exp.getMessage();
            exp.printStackTrace();
        }
    }

    public static void openTestApp () throws MalformedURLException{
        DesiredCapabilities capabilities = new DesiredCapabilities();
        capabilities.setCapability(MobileCapabilityType.PLATFORM_NAME, "iOS");
        capabilities.setCapability(MobileCapabilityType.PLATFORM_VERSION, "15.0");
        capabilities.setCapability(MobileCapabilityType.DEVICE_NAME, "iPhone 13 Pro Max");
        capabilities.setCapability(MobileCapabilityType.APP, "/Users/salvahasan/Library/Developer/Xcode/DerivedData/WebDriverAgent-ctmjjkiwkmygbadusdbiccdfucfe/Build/Products/Debug-iphonesimulator/IntegrationApp.app");
        URL url = new URL("http://127.0.0.1:4723/wd/hub");
        driver = new AppiumDriver(url, capabilities);

        System.out.println("Application started!!");
        
        //WebElement okBtn = driver.findElement(By.id("android:id/button1"));
        //okBtn.click();
        //WebElement showText = driver.findElement(By.id("io.selendroid.testapp:id/visibleButtonTest"));
        //showText.click();
    }
}
